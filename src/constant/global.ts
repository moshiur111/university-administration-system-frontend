export const genders = ["Male", "Female"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const genderOptions = genders.map((gender) => ({
  value: gender,
  label: gender,
}));

export const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

export const weekDayOptions = weekDays.map((weekDay) => ({
  value: weekDay,
  label: weekDay,
}));
