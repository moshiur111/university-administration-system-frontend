import { Button, Card, Col, Row } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import UMTimePicker from "../../../components/form/UMTimePicker";
import { weekDayOptions } from "../../../constant/global";

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TProps = {
  onSubmit: (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => Promise<void>;
  isLoading: boolean;
  academicFacultyOptions: TOption[];
  semesterOptions: TOption[];
  departmentOptions: TOption[];
  courseOptions: TOption[];
  facultyOptions: TOption[];
  onDepartmentChange: (value: string) => void;
  facultyDisabled: boolean;
};

const OfferedCourseForm = ({
  onSubmit,
  isLoading,
  academicFacultyOptions,
  semesterOptions,
  departmentOptions,
  courseOptions,
  facultyOptions,
  onDepartmentChange,
  facultyDisabled,
}: TProps) => {
  return (
    <Card
      title="Create Offered Course"
      style={{ maxWidth: 850, margin: "0 auto" }}
    >
      <UMForm onSubmit={onSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UMSelect
              name="academicFaculty"
              label="Academic Faculty"
              options={academicFacultyOptions}
            />
          </Col>
          <Col span={12}>
            <UMSelect
              name="semesterRegistration"
              label="Semester"
              options={semesterOptions}
            />
          </Col>
          <Col span={12}>
            <UMSelect
              name="academicDepartment"
              label="Department"
              options={departmentOptions}
              onValueChange={onDepartmentChange}
            />
          </Col>
          <Col span={12}>
            <UMSelect
              name="faculty"
              label="Faculty"
              options={facultyOptions}
              disabled={facultyDisabled}
            />
          </Col>
          <Col span={12}>
            <UMSelect name="course" label="Course" options={courseOptions} />
          </Col>
          <Col span={6}>
            <UMInput name="section" label="Section" type="number" />
          </Col>
          <Col span={6}>
            <UMInput name="maxCapacity" label="Capacity" type="number" />
          </Col>
          <Col span={12}>
            <UMSelect
              mode="multiple"
              name="days"
              label="Days"
              options={weekDayOptions}
            />
          </Col>
          <Col span={12}>
            <UMTimePicker name="startTime" label="Start Time" />
          </Col>
          <Col span={12}>
            <UMTimePicker name="endTime" label="End Time" />
          </Col>
        </Row>
        <div style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Create Offered Course
          </Button>
        </div>
      </UMForm>
    </Card>
  );
};

export default OfferedCourseForm;
