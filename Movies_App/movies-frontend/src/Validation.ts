import * as Yup from "yup";

export default function configureValidations() {
  Yup.addMethod(Yup.string, "FirstLetterUppercase", function () {
    return this.test(
      "FirstLetterUppercase",
      "First Letter must be uppercase",
      function (value) {
        if (value && value.length > 0) {
          const firstLetter = value.substring(0, 1);
          return firstLetter === firstLetter.toUpperCase();
        }
        return true;
      }
    );
  });
}
