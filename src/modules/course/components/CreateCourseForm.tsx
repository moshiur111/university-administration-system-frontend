import { Button, Card, Col, Row } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";

type TProps = {
  onSubmit: (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => Promise<void>;
  preRequisiteCoursesOptions: { label: string; value: string }[];
  isLoading: boolean;
};

const CreateCourseForm = ({
  onSubmit,
  preRequisiteCoursesOptions,
  isLoading,
}: TProps) => {
  return (
    <Card
      title="Create Course"
      style={{ borderRadius: 12 }}
      styles={{ body: { padding: "16px 20px" } }}
    >
      <UMForm onSubmit={onSubmit}>
        <Row gutter={[12, 12]}>
          {/* Title */}
          <Col xs={24} sm={12}>
            <UMInput label="Title" name="title" />
          </Col>

          {/* Prefix */}
          <Col xs={24} sm={12}>
            <UMInput label="Prefix" name="prefix" />
          </Col>

          {/* Code */}
          <Col xs={24} sm={12}>
            <UMInput label="Code" name="code" type="number" />
          </Col>

          {/* Credits */}
          <Col xs={24} sm={12}>
            <UMInput label="Credits" name="credits" type="number" />
          </Col>

          {/* Prerequisite Courses */}
          <Col xs={24}>
            <UMSelect
              mode="multiple"
              options={preRequisiteCoursesOptions}
              name="preRequisiteCourses"
              label="Pre-requisite Courses"
            />
          </Col>
        </Row>

        {/* Submit */}
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!preRequisiteCoursesOptions?.length}
            block
          >
            Create Course
          </Button>
        </div>
      </UMForm>
    </Card>
  );
};

export default CreateCourseForm;
