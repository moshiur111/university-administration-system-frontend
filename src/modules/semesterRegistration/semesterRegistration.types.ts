export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TSemesterRegistrationStatus = "UPCOMING" | "ONGOING" | "ENDED";

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: TSemesterRegistrationStatus;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
