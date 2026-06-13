/** Mock pages for the document viewer — stands in for real PDF extraction. */
export const SAMPLE_DOCUMENT = {
  title: "Python para todos",
  assistant: "Tutor Python",
  pages: [
    {
      page: 1,
      text: `Capítulo 1 — Primeros pasos

Python es un lenguaje de programación interpretado, de alto nivel y propósito general. Su filosofía de diseño prioriza la legibilidad del código mediante el uso de indentación significativa.

Para ejecutar tu primer programa basta con una línea:

    print("Hola, mundo")

A lo largo de este material trabajaremos con tipos básicos, estructuras de control, funciones y, más adelante, programación orientada a objetos.`,
    },
    {
      page: 2,
      text: `Capítulo 2 — Variables y tipos

En Python no se declara el tipo de una variable: se infiere del valor asignado.

    edad = 30          # int
    pi = 3.1416        # float
    nombre = "Ada"     # str
    activo = True      # bool

Los tipos numéricos admiten las operaciones aritméticas habituales, y las cadenas pueden concatenarse e interpolarse con f-strings:

    print(f"{nombre} tiene {edad} años")`,
    },
    {
      page: 3,
      text: `Capítulo 3 — Estructuras de control

El flujo del programa se controla con condicionales y bucles.

    if edad >= 18:
        print("Mayor de edad")
    else:
        print("Menor de edad")

    for i in range(3):
        print(i)

La indentación delimita los bloques: no hay llaves. Mantener cuatro espacios por nivel es la convención recomendada por PEP 8.`,
    },
  ],
};
