# Prompts para análisis inferencial con Claude Code

**Archivo de datos:** `rubrica_argumentacion.csv`
**Instrumento:** Rúbrica de argumentación escrita — 4 criterios × escala 1–4 = total 4–16 puntos
**Grupos:** intervencion (n = 25) / control (n = 20) — 3 valores faltantes en post

---

## Prompt 1 — Exploración inicial

```
Tengo el archivo rubrica_argumentacion.csv. Las columnas son:
estudiante_id, grupo (intervencion / control), semestre, sexo,
c1_pre a c4_pre (criterios 1-4 de una rúbrica, escala 1-4 cada uno),
pre (suma total antes, escala 4-16),
c1_post a c4_post (criterios después), post (suma total después).
3 estudiantes no tienen datos en post (valores faltantes).

Por favor:
1. Muestra las primeras 10 filas.
2. Indica cuántos estudiantes hay por grupo y cuántos tienen post completo.
3. Muestra la media, mediana, SD, mínimo y máximo de pre y post por grupo
   (solo casos con post completo).
```

---

## Prompt 2 — Verificar normalidad

```
Con los mismos datos (rubrica_argumentacion.csv), usando solo los casos
con post completo:
1. Corre la prueba Shapiro-Wilk sobre la columna "pre" del grupo
   intervencion y sobre la columna "post" del mismo grupo.
2. Repite para el grupo control.
3. Interpreta en una oración: ¿los datos son suficientemente normales
   para usar pruebas paramétricas, o debería usar no paramétricas?
```

---

## Prompt 3 — Prueba pre vs. post dentro del grupo intervención

```
Con rubrica_argumentacion.csv, para el grupo intervencion
(solo estudiantes con pre y post completos):
1. Corre una prueba t de Student pareada (pre vs post).
2. Corre también la prueba de Wilcoxon signed-rank como alternativa
   no paramétrica.
3. Para cada prueba reporta: estadístico, p-value, y si el resultado
   es significativo (p < 0.05).
4. Calcula el tamaño de efecto: d de Cohen para la t pareada,
   r = Z / √N para Wilcoxon.
5. Escribe una oración de interpretación para cada prueba.
```

---

## Prompt 4 — Comparar grupos en el post-test

```
Con rubrica_argumentacion.csv, compara las puntuaciones post entre
intervencion y control (solo casos completos):
1. Corre la prueba Mann-Whitney U.
2. Corre también una t de Student para muestras independientes.
3. Para cada prueba: estadístico, p-value, significancia.
4. Calcula d de Cohen para la t independiente.
5. Escribe una oración de interpretación.
```

---

## Prompt 5 — Diferencia en diferencias (DiD)

```
Con rubrica_argumentacion.csv (solo casos con post completo):
1. Calcula la media de pre y post por grupo.
2. Calcula el cambio (post - pre) por grupo.
3. Calcula DiD = cambio_intervencion - cambio_control.
4. Genera una gráfica de barras agrupadas: eje X = pre/post,
   barras por grupo, con los valores encima de cada barra.
5. Escribe una oración de interpretación del DiD.
```

---

## Prompt 6 — Distribución de niveles y Chi-cuadrada

```
Con rubrica_argumentacion.csv, para el grupo intervencion
(casos completos):
1. Crea una variable nivel_pre con tres categorías:
   "En desarrollo" (4-7), "Satisfactorio" (8-11), "Avanzado" (12-16).
   Haz lo mismo para post → nivel_post.
2. Muestra la tabla de frecuencias y porcentajes de nivel_pre
   y nivel_post.
3. Corre una prueba chi-cuadrada para comparar las distribuciones
   de nivel_pre vs nivel_post.
4. Repite los pasos 2-3 para el grupo control.
5. Genera una gráfica de barras apiladas (stacked) mostrando
   la distribución de niveles pre y post para ambos grupos.
```

---

## Prompt 7 — Análisis por criterio de rúbrica

```
Con rubrica_argumentacion.csv, para el grupo intervencion
(casos completos):
1. Calcula la media pre y post de cada criterio (c1 a c4).
2. Calcula el cambio (post - pre) por criterio.
3. Corre una prueba de Wilcoxon signed-rank para cada criterio.
4. Genera una gráfica de barras horizontales mostrando el cambio
   promedio por criterio, de mayor a menor.
5. Responde: ¿qué criterio mejoró más y cuál menos? ¿Qué podría
   explicar esa diferencia pedagógicamente?
```

---

## Prompt 8 — Variables de control

```
Con rubrica_argumentacion.csv:
1. Calcula la media de cambio (post - pre) del grupo intervencion
   separado por semestre (3, 5, 7).
2. Calcula la misma media separada por sexo (F, M).
3. ¿Hay diferencias notables entre subgrupos? Interpreta si los
   resultados se sostienen independientemente del semestre o del sexo.
```

---

## Prompt 9 — Reporte integrado

```
Con base en todos los análisis anteriores del archivo
rubrica_argumentacion.csv, escribe un párrafo de resultados
listo para incluir en un informe académico (estilo APA). El párrafo debe:
1. Describir el instrumento y la escala.
2. Reportar las medias pre y post por grupo con sus SD.
3. Mencionar el resultado de la prueba inferencial principal
   (t pareada o Wilcoxon) con estadístico y p-value.
4. Reportar el tamaño de efecto (d de Cohen).
5. Incluir el DiD con su interpretación.
6. Mencionar el cambio en la distribución de niveles.
Máximo 200 palabras.
```

---

## Secuencia recomendada para el taller

Si el tiempo es limitado, prioriza:

| Prioridad | Prompt | Qué demuestra |
|---|---|---|
| 1 | Prompt 1 | Reconocer los datos antes de analizarlos |
| 2 | Prompt 3 | Test principal: ¿mejoró el grupo intervención? |
| 3 | Prompt 5 | DiD: aislar el efecto de la intervención |
| 4 | Prompt 6 | Chi-cuadrada: cambio en distribución de niveles |
| 5 | Prompt 9 | Párrafo de resultados listo para el informe |

Los prompts 2, 4, 7 y 8 son opcionales para quienes quieran profundizar o tienen N suficiente.
