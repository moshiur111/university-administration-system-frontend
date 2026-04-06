export const genders = ["Male", "Female"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const genderOptions = genders.map((gender) => ({
  value: gender,
  label: gender,
}));

export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));
