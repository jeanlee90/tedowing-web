import axios from "axios";
import cheerio from "cheerio";
import isEmpty from "lodash/isEmpty";
import logger from "./logger";
import config from "../variables/config";
import langCodes from "../variables/langCodes";

const getHtml = async url => {
  if (!url) return;

  try {
    return await axios.get(url);
  } catch (err) {
    logger.error(err);
  }
};

// 1) getTedHtmlData
export const getTedHtmlData = async tedUrl => {
  if (!tedUrl) return;

  const html = await getHtml(tedUrl);
  if (!html || !html.data) return;

  const $ = cheerio.load(html.data);
  const $dataSpec = $('script[data-spec="q"]').html();
  if (!$dataSpec) return;

  let dataSpec = JSON.parse($dataSpec.slice($dataSpec.indexOf(",") + 1, $dataSpec.length - 1)) || {};
  dataSpec = dataSpec.__INITIAL_DATA__ || {};
  const talkId = dataSpec.comments?.talk_id || dataSpec.talks[0].id || "";
  if (!talkId) return;

  return { talkId, $, dataSpec };
};

// 비디오 기타 데이터 - width, height, thumbnail, duration, videoType, tags, timing
export const getTedMetaData = ({ $, dataSpec }) => {
  const result = {};
  result.width = $('meta[itemprop="width"]').attr("content") || 640;
  result.height = $('meta[itemprop="height"]').attr("content") || 360;
  result.thumbnail = $('meta[property="og:image"]').attr("content") || "";
  result.duration = $('meta[itemprop="duration"]').attr("content").replace("PT", "");
  result.uploadDate = $('meta[itemprop="uploadDate"]').attr("content") || new Date();

  result.originUrl = dataSpec.url || "";

  const speaker = dataSpec.speakers ? dataSpec.speakers[0] : {};
  result.author = `${speaker.firstname || ""} ${speaker.lastname || ""}`;
  result.authorPhoto = speaker.photo_url || "";

  return result;
};

export const getTedVideoUrl = ({ dataSpec }) => {
  const result = {};
  const talks = dataSpec.talks ? dataSpec.talks[0] : {};
  const alterVideoUrl = talks.player_talks[0].resources?.h264[0].file || "";
  result.videoLow = talks.downloads?.nativeDownloads?.low || alterVideoUrl;
  result.videoMedium = talks.downloads?.nativeDownloads?.medium || alterVideoUrl;
  result.videoHigh = talks.downloads?.nativeDownloads?.high || alterVideoUrl;
  result.videoType = (talks.video_type?.id || 1) * 1;

  return result;
};

export const getTedTiming = async ({ talkId }) => {
  const timing = await getHtml(`https://hls.ted.com/talks/${talkId}.json`);
  return timing?.data?.timing || {};
};

export const getTedTags = ({ dataSpec }) => {
  const talks = dataSpec.talks ? dataSpec.talks[0] : {};
  return talks?.tags || [];
};

// 언어별 정보 저장
export const getTedLanguages = ({ talkId, dataSpec }) => {
  // 1) 지원 언어 리스트 가져오기
  const talks = dataSpec.talks[0] || {};
  const languages = talks.downloads?.languages || [];

  // 2) 언어별 스크립트
  const getTedScript = async lang => {
    return new Promise((resolve, reject) => {
      const { languageCode } = lang;

      if (!langCodes[languageCode]) {
        resolve();
      } else {
        const scriptUrl = `https://www.ted.com/talks/${talkId}/transcript.json?language=${languageCode}`;
        let script, title, description, author;
        getHtml(scriptUrl).then(obj => {
          script = obj.data || {};
          if (isEmpty(script)) resolve();

          const videoInfoUrl = `https://www.ted.com/services/v1/oembed.json?url=${config.TED_URL}/${talkId}&language=${languageCode}`;
          getHtml(videoInfoUrl).then(obj => {
            const videoInfo = obj?.data || {};
            title = videoInfo.title || "";
            description = videoInfo.description || "";
            author = videoInfo.author_name || "";

            if (!title) resolve();
            else resolve({ languageCode, script, title, description, author });
          });
        });
      }
    });
  };

  return Promise.all(languages.map(getTedScript));
};
