import map from "lodash/map";
import keyBy from "lodash/keyBy";
import request from "lib/utils/request";
import { setAPIUrl } from "lib/variables/settings";

export interface TVideo {
  videoId: number;
  thumbnail: string;
  title: string;
  author: string;
  isFavorite: boolean;
  duration: string;
}

interface TVideoList {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  list: TVideo[];
}

export default function myVideosStore() {
  return {
    loading: true,
    list: [] as TVideo[],
    videosMap: {},
    pagination: {
      total: 1,
      current: 1,
    },
    async getMyVideos(page = 1): Promise<boolean> {
      this.loading = true;
      const { error, result = {} } = (await request({ url: setAPIUrl("/videos/my"), method: "GET" })) || {};
      this.loading = false;

      // if (error) return Modal.error({ content: error.message });
      if (error) {
        alert(error.message);
        return false;
      }

      const { totalCount, currentPage, list } = result as TVideoList;
      this.list = list;
      if (list) {
        this.videosMap = keyBy(
          map(list, o => ({ ...o, key: o.videoId })),
          "videoId",
        );

        // pagination
        this.pagination.total = totalCount;
        this.pagination.current = currentPage;
      }

      return true;
    },
  };
}

export type TMyVideosStore = ReturnType<typeof myVideosStore>;
