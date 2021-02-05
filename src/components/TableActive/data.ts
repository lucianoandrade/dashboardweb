export interface Data {
  acao: string;
  valor: number;
  porc: string;
}

export function createData(name: string, views: number, porc: string): Data {
  return { acao: name, valor: views, porc };
}

export const rows = [
  createData('/home', 450, '5%'),
  createData('/store.html', 450, '%10'),
  createData('/quickview.html', 450, '%10'),
  createData('/signin.html', 450, '%10'),
  createData('/acordos.html', 450, '%10'),
  createData('/dividas.html', 450, '%10'),
  createData('/basket.html', 450, '%10'),
  createData('/homecpf.hmtl', 450, '%10'),
  createData('/termosecondicoes.html', 450, '%10'),
  createData('/store.html/quickview', 450, '%10'),
  createData('/teste.html/quickview', 450, '%10'),
  createData('/teste2.html/quickview', 450, '%10'),
  createData('/teste3.html/quickview', 450, '%10'),
];
