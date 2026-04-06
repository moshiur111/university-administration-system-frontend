import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Col, Form, Row, Typography, Upload } from "antd";
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import { useGetAllAcademicDepartmentQuery } from "../../academicDepartment/academicDepartment.api";
import { useGetAllAcademicSemesterQuery } from "../../academicSemester/academicSemester.api";
import { useCreateStudentMutation } from "../student.api";
import { studentSchema } from "../student.validation";

const { Title } = Typography;

const studentDefaultValues = {
  name: {
    firstName: "Muhammad",
    middleName: "Moshiur",
    lastName: "Rahman",
  },
  gender: "male",
  // dateOfBirth: "2006-04-21",
  bloodGroup: "A+",

  // Contact Info.
  email: "student@example.com",
  contactNo: "01712345678",
  emergencyContactNo: "01812345678",
  presentAddress: "45 New Eskaton Road, Dhaka",
  permanentAddress:
    "Village Kalibari, Upazila Shibganj, District Chapainawabganj",

  // Guardian Info.
  guardian: {
    fatherName: "Abdur Rahman",
    fatherOccupation: "Doctor",
    fatherContactNo: "01987654321",
    motherName: "Salma Rahman",
    motherOccupation: "Homemaker",
    motherContactNo: "01687654321",
  },

  // local Guardian Info.
  localGuardian: {
    name: "Mamun Khan",
    occupation: "Lecturer",
    contactNo: "01587654321",
    address: "House 88, Road 9A, Dhanmondi, Dhaka",
  },

  // Academic Info.
  admissionSemester: "69ad522274ae72cab577bf9f",
  academicDepartment: "6980d94a9b394741c98e37e3",
};

type TRTKError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: {
      path: string;
      message: string;
    }[];
  };
};

const CreateStudentForm = () => {
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const { data: semesterData } = useGetAllAcademicSemesterQuery(undefined);
  const { data: departmentData } = useGetAllAcademicDepartmentQuery(undefined);

  const academicSemesterOptions =
    semesterData?.data?.map((item) => ({
      label: `${item.name} ${item.year}`,
      value: item._id,
    })) || [];

  const academicDepartmentOptions =
    departmentData?.data?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const onSubmit = async (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => {
    const toastId = toast.loading("Creating student...");

    console.log({ data });

    try {
      const studentData = {
        password: "password111",
        student: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));

      if (data.profileImg) {
        formData.append("file", data.profileImg);
      }

      const res = await createStudent(formData).unwrap();

      toast.success(res.message || "Student created successfully!", {
        id: toastId,
        duration: 2000,
      });
      console.log(res);
      methods.reset();
    } catch (err) {
      const error = err as TRTKError;
      console.error(error);
      const errorMessage =
        error?.data?.errorSources?.[0]?.message ??
        error?.data?.message ??
        "Something went wrong!";
      toast.error(errorMessage, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <UMForm
      onSubmit={onSubmit}
      resolver={zodResolver(studentSchema)}
      defaultValues={studentDefaultValues}
    >
      {/* Personal Info */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Title level={5}>Personal Information</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <UMInput name="name.firstName" label="First Name" />
          </Col>
          <Col span={8}>
            <UMInput name="name.middleName" label="Middle Name" />
          </Col>
          <Col span={8}>
            <UMInput name="name.lastName" label="Last Name" />
          </Col>
          <Col span={8}>
            <UMSelect name="gender" label="Gender" options={genderOptions} />
          </Col>
          <Col span={8}>
            <UMDatePicker name="dateOfBirth" label="Date of Birth" />
          </Col>
          <Col span={8}>
            <UMSelect
              name="bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="profileImg"
              render={({ field: { onChange } }) => (
                <Form.Item label="Profile Image">
                  <Upload
                    beforeUpload={(file) => {
                      onChange(file);
                      return false;
                    }}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Form.Item>
              )}
            />
          </Col>
        </Row>
      </Card>

      {/* Contact Info */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Title level={5}>Contact Information</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <UMInput name="email" label="Email" />
          </Col>
          <Col span={8}>
            <UMInput name="contactNo" label="Contact No" />
          </Col>
          <Col span={8}>
            <UMInput name="emergencyContactNo" label="Emergency Contact No" />
          </Col>
          <Col span={12}>
            <UMInput name="presentAddress" label="Present Address" />
          </Col>
          <Col span={12}>
            <UMInput name="permanentAddress" label="Permanent Address" />
          </Col>
        </Row>
      </Card>

      {/* Guardian Info */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Title level={5}>Guardian Information</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <UMInput name="guardian.fatherName" label="Father Name" />
          </Col>
          <Col span={8}>
            <UMInput
              name="guardian.fatherOccupation"
              label="Father Occupation"
            />
          </Col>
          <Col span={8}>
            <UMInput
              name="guardian.fatherContactNo"
              label="Father Contact No"
            />
          </Col>
          <Col span={8}>
            <UMInput name="guardian.motherName" label="Mother Name" />
          </Col>
          <Col span={8}>
            <UMInput
              name="guardian.motherOccupation"
              label="Mother Occupation"
            />
          </Col>
          <Col span={8}>
            <UMInput
              name="guardian.motherContactNo"
              label="Mother Contact No"
            />
          </Col>
        </Row>
      </Card>

      {/* Local Guardian */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Title level={5}>Local Guardian</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <UMInput name="localGuardian.name" label="Name" />
          </Col>
          <Col span={8}>
            <UMInput name="localGuardian.occupation" label="Occupation" />
          </Col>
          <Col span={8}>
            <UMInput name="localGuardian.contactNo" label="Contact No" />
          </Col>
          <Col span={24}>
            <UMInput name="localGuardian.address" label="Address" />
          </Col>
        </Row>
      </Card>

      {/* Academic Info */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Title level={5}>Academic Information</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UMSelect
              name="admissionSemester"
              label="Admission Semester"
              options={academicSemesterOptions}
            />
          </Col>
          <Col span={12}>
            <UMSelect
              name="academicDepartment"
              label="Academic Department"
              options={academicDepartmentOptions}
            />
          </Col>
        </Row>
      </Card>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        block
      >
        {isLoading ? "Creating Student..." : "Create Student"}
      </Button>
    </UMForm>
  );
};

export default CreateStudentForm;
