import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Col, Form, Row, Typography, Upload } from "antd";
import { Controller, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import type { TRTKError } from "../../../types";
import { useGetAllAcademicDepartmentQuery } from "../../academicDepartment/academicDepartment.api";
import { useGetAllAcademicSemesterQuery } from "../../academicSemester/academicSemester.api";
import { useCreateStudentMutation } from "../student.api";
import { studentSchema, type TStudentForm } from "../student.validation";
const { Title } = Typography;

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
    data: TStudentForm,
    methods: UseFormReturn<TStudentForm>,
  ) => {
    const toastId = toast.loading("Creating student...");

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

      methods.reset();
    } catch (err) {
      const error = err as TRTKError;
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

  // Reusable Card Style
  const cardStyle = {
    marginBottom: 16,
  };

  const cardBodyStyle = {
    padding: "12px 16px",
  };

  return (
    <UMForm onSubmit={onSubmit} resolver={zodResolver(studentSchema)}>
      {/* Personal Info */}
      <Card size="small" style={cardStyle} styles={{ body: cardBodyStyle }}>
        <Title level={5}>Personal Information</Title>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} lg={8}>
            <UMInput name="name.firstName" label="First Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput name="name.middleName" label="Middle Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput name="name.lastName" label="Last Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMSelect name="gender" label="Gender" options={genderOptions} />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMDatePicker name="dateOfBirth" label="Date of Birth" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMSelect
              name="bloodGroup"
              label="Blood Group"
              options={bloodGroupOptions}
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
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
      <Card size="small" style={cardStyle} styles={{ body: cardBodyStyle }}>
        <Title level={5}>Contact Information</Title>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12}>
            <UMInput name="email" label="Email" />
          </Col>

          <Col xs={24} sm={12}>
            <UMInput name="contactNo" label="Contact No" />
          </Col>

          <Col xs={24} sm={12}>
            <UMInput name="emergencyContactNo" label="Emergency Contact No" />
          </Col>

          <Col xs={24} sm={12}>
            <UMInput name="presentAddress" label="Present Address" />
          </Col>

          <Col xs={24}>
            <UMInput name="permanentAddress" label="Permanent Address" />
          </Col>
        </Row>
      </Card>

      {/* Guardian Info */}
      <Card size="small" style={cardStyle} styles={{ body: cardBodyStyle }}>
        <Title level={5}>Guardian Information</Title>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} lg={8}>
            <UMInput name="guardian.fatherName" label="Father Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput
              name="guardian.fatherOccupation"
              label="Father Occupation"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput
              name="guardian.fatherContactNo"
              label="Father Contact No"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput name="guardian.motherName" label="Mother Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput
              name="guardian.motherOccupation"
              label="Mother Occupation"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput
              name="guardian.motherContactNo"
              label="Mother Contact No"
            />
          </Col>
        </Row>
      </Card>

      {/* Local Guardian */}
      <Card size="small" style={cardStyle} styles={{ body: cardBodyStyle }}>
        <Title level={5}>Local Guardian</Title>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} lg={8}>
            <UMInput name="localGuardian.name" label="Name" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput name="localGuardian.occupation" label="Occupation" />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <UMInput name="localGuardian.contactNo" label="Contact No" />
          </Col>

          <Col xs={24}>
            <UMInput name="localGuardian.address" label="Address" />
          </Col>
        </Row>
      </Card>

      {/* Academic Info */}
      <Card size="small" style={cardStyle} styles={{ body: cardBodyStyle }}>
        <Title level={5}>Academic Information</Title>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12}>
            <UMSelect
              name="admissionSemester"
              label="Admission Semester"
              options={academicSemesterOptions}
            />
          </Col>

          <Col xs={24} sm={12}>
            <UMSelect
              name="academicDepartment"
              label="Academic Department"
              options={academicDepartmentOptions}
            />
          </Col>
        </Row>
      </Card>

      {/* Submit */}
      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          block
        >
          {isLoading ? "Creating Student..." : "Create Student"}
        </Button>
      </div>
    </UMForm>
  );
};

export default CreateStudentForm;
