/**
 * クラアントサイドに見えてもいいエラーを格納するエラークラス
 */
class MyAppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default MyAppError;
