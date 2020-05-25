import request from "lib/utils/request";
import { toJS } from "mobx";

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
    adding: false,
    list: [] as TVideo[],
    pagination: {
      total: 1,
      current: 1,
    },
    getList() {
      return toJS(this.list);
    },
    async getMyVideos(page: number = 1): Promise<boolean> {
      this.loading = true;
      const { error, result = {} } = await request.get("/videos/my");
      this.loading = false;

      if (error) {
        console.error(error.message);
        return false;
      }

      const { totalCount, currentPage, list } = result as TVideoList;
      if (list) {
        this.list = list;
        this.pagination.total = totalCount;
        this.pagination.current = currentPage;
      }

      return true;
    },
    async addMyVideo(tedUrl: string): Promise<boolean> {
      this.adding = true;
      const { error, success } = await request.post("/videos/my", { data: { tedUrl } });
      this.adding = false;

      if (error) {
        console.error(error.message);
        return false;
      }

      return success;
    },
  };
}

export type TMyVideosStore = ReturnType<typeof myVideosStore>;
