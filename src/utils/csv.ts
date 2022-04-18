enum CSVState {
  BETWEEN = 0,
  UNQUOTED_VALUE = 1,
  QUOTED_VALUE = 2,
}

/**
 * Parses a CSV string into an array of strings.
 * @param csv CSV string.
 * @returns Array of strings.
 */
export function parseCSV(csv: string): Array<string> {
  let values = new Array<string>();
  let valueStart = 0;
  let state = CSVState.BETWEEN;

  for (let i = 0; i < csv.length; i++) {
    if (state == CSVState.BETWEEN) {
      if (csv.charAt(i) != ',') {
        if (csv.charAt(i) == '"') {
          state = CSVState.QUOTED_VALUE;
          valueStart = i + 1;
        } else {
          state = CSVState.UNQUOTED_VALUE;
          valueStart = i;
        }
      }
    } else if (state == CSVState.UNQUOTED_VALUE) {
      if (csv.charAt(i) == ',') {
        values.push(csv.substr(valueStart, i - valueStart));
        state = CSVState.BETWEEN;
      }
    } else if (state == CSVState.QUOTED_VALUE) {
      if (csv.charAt(i) == '"') {
        values.push(csv.substr(valueStart, i - valueStart));
        state = CSVState.BETWEEN;
      }
    }
  }

  return values;
}
