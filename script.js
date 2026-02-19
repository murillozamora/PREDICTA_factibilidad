const umfPorOoad = {
  "Jalisco": 10,
  "México Oriente": 10,
  "Nuevo León": 9,
  "Ciudad de México Sur": 7,
  "Guanajuato": 6,
  "Baja California": 5,
  "Coahuila": 5,
  "Chihuahua": 5,
  "México Poniente": 5,
  "Ciudad de México Norte": 5,
  "Puebla": 4,
  "Sinaloa": 4,
  "Sonora": 4,
  "Tamaulipas": 4,
  "Michoacán": 3,
  "Querétaro": 3,
  "San Luis Potosí": 3,
  "Veracruz Norte": 3,
  "Yucatán": 3,
  "Aguascalientes": 2,
  "Chiapas": 2,
  "Durango": 2,
  "Hidalgo": 2,
  "Morelos": 2,
  "Quintana Roo": 2,
  "Veracruz Sur": 2,
  "Baja California Sur": 1,
  "Campeche": 1,
  "Colima": 1,
  "Guerrero": 1,
  "Nayarit": 1,
  "Oaxaca": 1,
  "Tabasco": 1,
  "Tlaxcala": 1,
  "Zacatecas": 1
};

function numeroALetras(num) {
  const unidades = [
    "", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince"
  ];

  if (num <= 15) return unidades[num];

  const decenas = [
    "", "", "veinte", "treinta", "cuarenta", "cincuenta",
    "sesenta", "setenta", "ochenta", "noventa"
  ];

  if (num < 20) return "dieci" + unidades[num - 10];
  if (num === 20) return "veinte";
  if (num < 30) return "veinti" + unidades[num - 20];

  const d = Math.floor(num / 10);
  const u = num % 10;

  if (u === 0) return decenas[d];
  return decenas[d] + " y " + unidades[u];
}

const ooadSelect = document.getElementById("ooad");
const numUmfNum = document.getElementById("num_umf_num");
const numUmfLetra = document.getElementById("num_umf_letra");
const ooadTexto = document.getElementById("ooad-texto");

const lugar = document.getElementById("lugar");
const fecha = document.getElementById("fecha");
const titular = document.getElementById("titular");

const lugar_impreso = document.getElementById("lugar_impreso");
const fecha_impresa = document.getElementById("fecha_impresa");
const ooad_impreso = document.getElementById("ooad_impreso");
const titular_impreso = document.getElementById("titular_impreso");
const umf_impreso = document.getElementById("umf_impreso");

ooadSelect.addEventListener("change", function () {
  const seleccion = this.value;
  const num = umfPorOoad[seleccion] || "";

  if (num !== "") {
    numUmfNum.textContent = num;
    numUmfLetra.textContent = `(${numeroALetras(num)})`;
    umf_impreso.textContent = `${num} (${numeroALetras(num)})`;
  } else {
    numUmfNum.textContent = "";
    numUmfLetra.textContent = "";
    umf_impreso.textContent = "";
  }

  ooadTexto.textContent = seleccion || "[Seleccionar ÓOAD]";
  ooad_impreso.textContent = seleccion;
});

function generarPDF() {
  if (!document.getElementById("carta-form").reportValidity()) return;

  lugar_impreso.textContent = lugar.value;
  fecha_impresa.textContent = fecha.value;
  titular_impreso.textContent = titular.value;

  // ELIMINAR inputs/selects antes de imprimir
  document.querySelectorAll(".pantalla").forEach(el => el.remove());

  document.fonts.ready.then(() => {
    window.print();
    location.reload(); // restaurar inputs
  });
}
