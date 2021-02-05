declare namespace LicenseAPI {
  declare interface IResponsePingMessage {
    id: number;
    codRecupDe: number;
    dataEnvio: string;
    mensagem: string;
    isMine?: boolean;
  }

  declare interface IRequestSendMessage {
    mensagem: string;
    codigorecuperador: number;
  }

  declare interface IRequestSendMessageOperators {
    mensagem: string;
    codigorecuperadores: number[];
  }

  declare interface IResquestAnswerMessage {
    idMensagem: number;
    mensagem: string;
    codigorecuperador: number;
  }
  declare enum returnPingDTO {
    Message = 2,
    ForceLogout = 1,
  }

  declare interface IResponseLicenseInfo {
    Quantidade: number;
    TipoLicenca: '0' | '1' | '2';
    Validade: string;
  }
  declare interface IResponseLicenseData {
    Data: string;
    Quantidade: number;
  }
  declare interface IResponseLicenseDataByDay {
    [group: string]: LicenseDataGroup[];
  }
  /**
   * @member HorarioLogin "10:48:50"
   * @member HorarioLogout "10:48:50"
   */
  declare interface LicenseDataGroup {
    CodigoRecuperador: number;
    HorarioLogin: string;
    HorarioLogout: string;
    Id: number;
    LoginRecuperador: string;
    Mensagens: number;
  }
}
