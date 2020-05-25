const errorCodes = {
  400: { statusCode: 400, code: 400, message: "잘못된 요청입니다." },
  500: { statusCode: 500, code: 500, message: "서버에 알 수 없는 오류가 발생했습니다." },

  1000: { statusCode: 401, code: 1000, message: "로그인 정보가 없습니다." },
  1001: { statusCode: 400, code: 1001, message: "이미 로그인된 상태입니다." },
  1002: { statusCode: 403, code: 1002, message: "권한이 없습니다." },
  1003: { statusCode: 404, code: 1003, message: "유저를 찾을 수 없습니다." },

  2000: { statusCode: 400, code: 2000, message: "찾을 수 없는 테드 동영상입니다." },
  2001: { statusCode: 400, code: 2001, message: "동영상 CDN url을 찾을 수 없습니다." },
  2002: { statusCode: 400, code: 2002, message: "지원하는 언어가 없습니다." },
  2003: { statusCode: 404, code: 2002, message: "존재하지 않는 영상입니다." },
};

export default errorCodes;
