type ActionType = "check-support" | "wytk-bitmap" | "wytk-imgdata"
type RequestData<T> = T extends "check-support"
  ? void
  : T extends "wytk-bitmap"
  ? ImageBitmap
  : T extends "wytk-imgdata"
  ? ImageData
  : ArrayBuffer
type ResponseData<T> = T extends "check-support" ? boolean : File
