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
