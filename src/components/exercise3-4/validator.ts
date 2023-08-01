export class Validator {

  atLeast16Characters(password: string): boolean {
    return password.length >= 16;
  }

  lowerAndUpperCase(password: string): boolean {
    let hasLowerCase = false;
    let hasUpperCase = false;

    for (const char of password) {
      if (char >= "a" && char <= "z") {
        hasLowerCase = true;
      } else if (char >= "A" && char <= "Z") {
        hasUpperCase = true;
      }

      if (hasLowerCase && hasUpperCase) {
        return true;
      }
    }
    return false;
  }

  noConsecutiveLetters(password: string): boolean {
    for (let i = 1; i < password.length; i++) {
      if (password[i] === password[i - 1]) {
        return false;
      }
    }
    return true;
  }

  atLeast4Numbers(password: string): boolean {
    let count = 0;

    for (const char of password) {
      if (char >= "0" && char <= "9") {
        count++;
      }

      if (count >= 4) {
        return true;
      }
    }
    return false;
  }

  noConsecutiveNumbers(password: string): boolean {
    for (let i = 1; i < password.length; i++) {
      if (!isNaN(Number(password[i])) && !isNaN(Number(password[i - 1]))) {
        if (Number(password[i]) === Number(password[i - 1])) {
          return false;
        }
      }
    }
    return true;
  }

  atLeast2SpecialCharacters(password: string): boolean {
    const specialChars = ["!", "@", "#", "$", "%", "ˆ", "&", "*", "-", "_", "+", "=", "?"];
    let specialCharsCount = 0;

    for (let i = 0; i < password.length; i++) {
      if (specialChars.includes(password[i])) {
        specialCharsCount++;
        if (specialCharsCount >= 2) {
          return true;
        }
      }
    }
    return false;
  }

  noRepeatSpChar(password: string): boolean {
    const specialChars = ["!", "@", "#", "$", "%", "ˆ", "&", "*", "-", "_", "+", "=", "?"];

    for (let i = 0; i < password.length; i++) {
      if (
        specialChars.includes(password[i]) &&
        password.indexOf(password[i]) !== password.lastIndexOf(password[i])
      ) {
        return false;
      }
    }
    return true;
  }

  noNumber0(password: string): boolean {
    return !password.includes("0");
  }

  noSpaces(password: string): boolean {
    return !password.includes(" ");
  }
}