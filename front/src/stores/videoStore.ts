import request from "lib/utils/request";
import { toJS } from "mobx";

interface TTiming {
  start: number;
  end: number;
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
    [time: number]: {
      time: number;
      text?: string;
      trans?: string;
    };
  };
}

export default function videoStore() {
  return {
    loading: true,
    info: {} as TVideo,
    getInfo() {
      return toJS(this.info);
    },
    async getVideo(videoId: number): Promise<boolean> {
      this.loading = true;
      const { error, result = {} } = await request.get(`/videos/${videoId}`);
      this.loading = false;

      if (error) return false;
      if (result) this.info = result;
      return true;
    },
  };
}

export type TVideoStore = ReturnType<typeof videoStore>;
