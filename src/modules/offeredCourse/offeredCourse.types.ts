export type TBaseOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
};

export type TSemesterRegistration = {
  _id: string;
  academicSemester: string;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
};

export type TFaculty = {
  _id: string;
  id: string;
  designation: string;
  email: string;
  contactNo: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: {
    course: string;
  }[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TOfferedCourse = TBaseOfferedCourse & {
  course: string; // reference (admin side)
};

export type TStudentOfferedCourse = TBaseOfferedCourse & {
  course: TCourse; // populated

  // Aggregation fields
  enrolledCourses: unknown[];
  completedCourses: unknown[];
  completedCourseIds: string[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
};

export type TFacultyOfferedCourse = TBaseOfferedCourse & {
  semesterRegistration: TSemesterRegistration;
  academicSemester: TAcademicSemester;
  course: TCourse;
  faculty: TFaculty;
};
