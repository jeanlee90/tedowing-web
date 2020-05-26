import { toJS } from "mobx";
import request from "lib/utils/request";
import { getCurrentCaptionTime } from "lib/utils/binarySearch";

interface TTiming {
  start: number;
  end: number;
}

export interface TCaption {
  time: number;
  text?: string;
  trans?: string;
}

export interface TVideo {
  videoId: number;
  talkId: number;
  originUrl: string;
  thumbnail: string;
  author: string;
  authorPhoto: string;
  width: number;
  height: number;
  videoLow: string;
  videoMedium: string;
  videoHigh: string;
  duration: string;
  videoType: number;
  uploadDate: Date;
  title: string;
  description: string;
  timing: {
    intro?: TTiming;
    content?: TTiming;
    end?: TTiming;
  };
  script: {
    [time: number]: TCaption;
  };
}

export default function videoStore() {
  return {
    loading: true,
    info: {} as TVideo,
    scriptTimes: [] as number[],
    currentCaptionTime: 0,
    setCurrentCaption(currentTime: number) {
      const times = toJS(this.scriptTimes);
      const index = getCurrentCaptionTime(times, currentTime) - 1;
      if (index < 0) this.currentCaptionTime = 0;
      else this.currentCaptionTime = times[index];
    },
    getInfo() {
      return toJS(this.info);
    },
    async getVideo(videoId: number): Promise<boolean> {
      this.loading = true;
      const { error, result = {} } = await request.get(`/videos/${videoId}`);
      this.loading = false;

      if (error) return false;
      if (result) this.info = { ...result };

      // script 찾기용
      this.scriptTimes = Object.keys(result.script).map(t => +t);

      return true;
    },
  };
}

export type TVideoStore = ReturnType<typeof videoStore>;
