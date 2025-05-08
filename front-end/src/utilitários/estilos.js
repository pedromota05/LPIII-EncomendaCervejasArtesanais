export const opçõesCores = [
  { label: "Amarelo", value: "yellow" },
  { label: "Anil", value: "indigo" },
  { label: "Azul", value: "blue" },
  { label: "Azul Piscina", value: "cyan" },
  { label: "Laranja", value: "orange" },
  { label: "Preto", value: "bluegray" },
  { label: "Rosa", value: "pink" },
  { label: "Roxo", value: "purple" },
  { label: "Verde", value: "green" },
  { label: "Verde Azulado", value: "teal" },
];

export const TAMANHOS = {
  ANO: 4,
  CPF: 13,
  MAX_LINHAS_TABELA: 10,
  SENHA: 15,
  TELEFONE: 12,
};
export const TEMA_PADRÃO = "bluegray";

export function estilizarBotão(cor_tema) {
  return `p-button-sm h-2rem text-base w-auto md:w-min mr-2
bg-${cor_tema}-600 border-none shadow-6`;
}

export function estilizarBotãoRemover() {
  const cor_borda = "bluegray";
  return `p-button-sm h-2rem text-base w-auto md:w-min mr-2 p-button-danger
border-${cor_borda}-800 shadow-6`;
}

export function estilizarBotãoRetornar() {
  const cor_botão = "yellow";
  return `p-button-sm h-2rem text-base w-auto md:w-min mr-2
bg-${cor_botão}-600 border-${cor_botão}-800 shadow-6`;
}

export function estilizarCardHome(cor_tema) {
  return `w-card-user overflow-auto pt-3 pb-3 text-${cor_tema}-700 border-2 shadow-8`;
}

export function estilizarCard(cor_tema) {
  return `w-card-user overflow-auto pt-1 pb-3 m-3 text-${cor_tema}-700 border-2 shadow-8 card-cadastro`;
}

export function estilizarCardHeaderCentralizado(cor_tema) {
  return `flex justify-content-center font-bold text-2xl text-${cor_tema}-700 mb-3`;
}

export function estilizarColuna() {
  return "col center-card-mobile";
}

export function estilizarDialog() {
  return "w-auto p-2";
}

export function estilizarDivBotõesAção() {
  return "align-self-center mt-4";
}

export function estilizarDivCampo() {
  return "mb-3 flex flex-column sm:align-items-start md:flex-row md:align-items-center";
}

export function estilizarDivCampoLimpar() {
  return "mb-5 flex flex-column sm:align-items-start md:flex-row md:align-items-center";
}

export function estilizarDivider(cor_tema = TEMA_PADRÃO) {
  return `mb-3 border-1 border-${cor_tema}-800`;
}

export function estilizarDropdown(erro, cor_tema) {
  let cor_borda = `border-${cor_tema}-800`;
  if (erro) cor_borda = "p-invalid";
  return `w-auto ${cor_borda}`;
}

export function estilizarErro() {
  return "w-auto p-error flex-wrap text-base md:text-sm font-bold ml-2";
}

export function estilizarFlex(alinhamento = "start") {
  return `flex flex-column align-items-${alinhamento} `;
}

export function estilizarCardCriador(alinhamento = "center") {
  return `flex align-items-${alinhamento} min-h-screen`;
}

export function estilizarFooterDialog() {
  return "border-round mt-0";
}

export function estilizarGridColunaSidebar() {
  return "lg:col-fixed lg:max-w-22rem shadow-6 p-3";
}

export function estilizarGridSidebar(cor_tema) {
  return `lg:grid-nogutter lg:flex bg-${cor_tema}-100 h-auto`;
}

export function estilizarInlineFlex() {
  return "flex flex-row align-items-center mt-2";
}

export function estilizarInputMask(erro, cor_tema) {
  let cor_borda = `border-${cor_tema}-800`;
  if (erro) cor_borda = "p-invalid";
  return `w-auto ${cor_borda}`;
}

export function estilizarInputNumber(erro, cor_tema) {
  let cor_borda = `border-${cor_tema}-800`;
  if (erro) cor_borda = "p-invalid";
  return `py-0 ${cor_borda}`;
}

export function estilizarInputText(
  erro,
  input_classname,
  cor_tema = TEMA_PADRÃO
) {
  let cor_borda = `border-${cor_tema}-800`;
  if (erro) cor_borda = "p-invalid";
  return `input${input_classname} py-0 ${cor_borda}`;
}

export function estilizarLabel(cor_tema = TEMA_PADRÃO) {
  return `w-auto text-md mr-3 md:text-base text-${cor_tema}-700 font-bold`;
}

export function estilizarLink(cor_tema) {
  return `font-bold text-md mt-3 md:text-sm text-${cor_tema}-800`;
}

export function estilizarLogo() {
  return `text-center text-2xl md:text-2xl mb-5 text-${TEMA_PADRÃO}-700`;
}

export function estilizarMenu() {
  return "w-auto mt-2";
}

export function estilizarMenuLateralDesktop(cor_tema) {
  return `w-15rem p-2 flex flex-column align-items-center fixed
    surface-50 bg-${cor_tema}-100 text-${cor_tema}-800`;
}

export function estilizarMenuLateralMobile(cor_tema) {
  return `w-full surface-50 bg-${cor_tema}-100 text-${cor_tema}-800`;
}

export function estilizarModal() {
  return "flex flex-column p-3";
}
export function estilizarPáginaÚnica() {
  return "flex flex-column align-items-center justify-content-center h-screen";
}
export function estilizarPasswordInput() {
  return `w-100 mr-2 mt-2 lg:mt-0`;
}
export function estilizarPasswordTextInputBorder(erro, cor_tema = TEMA_PADRÃO) {
  let cor_borda = `border-${cor_tema}-800`;
  if (erro) cor_borda = "p-invalid";
  return cor_borda;
}
export function estilizarSidebar() {
  return "max-w-22rem";
}
export function estilizarSubtítulo(cor_tema) {
  return `font-bold text-base align-self-start lg:mt-0 text-${cor_tema}-500`;
}
export function estilizarTítulo(cor_tema) {
  return `text-base align-self-start text-${cor_tema}-800 mr-3`;
}

export function estilizarParágrafo() {
  return "text-justify text-lg md:text-sm align-self-start text-gray-900";
}

export function estilizarBotãoTabela(cor_tema, consultado = false) {
  let cor_botão = `text-${cor_tema}-900`;
  if (consultado) cor_botão = "p-button-danger";
  return `w-1rem p-button-sm p-button-text w-1 h-1rem ${cor_botão} shadow-6`;
}

export function estilizarCheckbox(erro) {
  return `w-auto mr-2 ${erro && "p-invalid"}`;
}

export function estilizarColunaConsultar() {
  return "w-1rem";
}

export function estilizarColumnHeader(cor_tema) {
  return `bg-${cor_tema}-100 text-${cor_tema}-700`;
}

export function estilizarDataTable() {
  return "border-1 shadow-6";
}

export function estilizarDataTablePaginator(cor_tema) {
  return `bg-${cor_tema}-100 text-${cor_tema}-700`;
}

export function estilizarFilterMenu() {
  return "flex flex-column align-items-center";
}

export function estilizarInputTextarea(erro, cor_tema) {
  //let cor_borda = `border-${cor_tema}-800`;
  //if (erro) cor_borda = "p-invalid";
  return `w-full lg:w-auto py-0`;
}

export function estilizarTriStateCheckbox(cor_tema) {
  return `ml-2 text-${cor_tema}-800`;
}
