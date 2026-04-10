import { z } from "zod";

export const studentSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),

  gender: z.enum(["male", "female"], {
    message: "Gender must be either male or female",
  }),

  dateOfBirth: z.string().optional(),

  email: z.string().email("Invalid email address").min(1, "Email is required"),

  contactNo: z.string().min(1, "Contact number is required"),

  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      message: "Invalid blood group value",
    })
    .optional(),

  presentAddress: z.string().min(1, "Present address is required"),

  permanentAddress: z.string().min(1, "Permanent address is required"),

  profileImg: z.union([z.instanceof(File), z.string()]).optional(),

  guardian: z.object({
    fatherName: z.string().min(1, "Father name is required"),
    fatherOccupation: z.string().min(1, "Father occupation is required"),
    fatherContactNo: z.string().min(1, "Father contact number is required"),
    motherName: z.string().min(1, "Mother name is required"),
    motherOccupation: z.string().min(1, "Mother occupation is required"),
    motherContactNo: z.string().min(1, "Mother contact number is required"),
  }),

  localGuardian: z.object({
    name: z.string().min(1, "Local guardian name is required"),
    occupation: z.string().min(1, "Local guardian occupation is required"),
    contactNo: z.string().min(1, "Local guardian contact number is required"),
    address: z.string().min(1, "Local guardian address is required"),
  }),

  admissionSemester: z.string().min(1, "Admission semester is required"),
  academicDepartment: z.string().min(1, "Academic department is required"),
});

export type TStudentForm = z.infer<typeof studentSchema>;
