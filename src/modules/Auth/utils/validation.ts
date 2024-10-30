const REQUIRED_FIELD = "is required";

// TODO: добавить проверку на токен
export const NameValidation = {
  required: `Name ${REQUIRED_FIELD}`,
};

export const passwordValidation = {
  required: `Password ${REQUIRED_FIELD}`,
  validate: (value: string) => {
    if (value.match(/[а-яА_Я]/)) {
      return "Use only Latin letters";
    }
    if (value.length < 6) {
      return "the password must contain at least 6 characters";
    }
    return true;
  },
};
