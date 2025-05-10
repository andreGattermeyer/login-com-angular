export interface Veiculo {
    id?: number;
    modelo: string;
    fabricante: string;
    cor: string;
    chassi: string;
    placa: string;
    frota: string;
    tipoVeiculo: TipoVeiculo;
    status: StatusVeiculo;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    usuario?: any;
}

export enum TipoVeiculo {
    CARRO = 'CARRO',
    MOTO = 'MOTO',
    CAMINHAO = 'CAMINHAO',
    VAN = 'VAN',
    ONIBUS = 'ONIBUS'
}

export enum StatusVeiculo {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    EM_MANUTENCAO = 'EM_MANUTENCAO',
    VENDIDO = 'VENDIDO'
}