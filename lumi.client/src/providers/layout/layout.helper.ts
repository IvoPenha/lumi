const layoutMap = {
  default: {
    page: 'Inicio',
    subPage: 'Dashboard',
    description: "Informações gerais das UC's"
  },
  client: {
    page: 'Cliente',
    subPage: 'Detalhes',
    description: 'Informações detalhadas sobre o cliente'
  }
};

export const getLayout = (layout: string) => {
  const layoutData = layoutMap?.[layout as keyof typeof layoutMap] || layoutMap['default'];
  return {
    page: layoutData.page,
    subPage: layoutData.subPage,
    description: layoutData.description
  };
};
