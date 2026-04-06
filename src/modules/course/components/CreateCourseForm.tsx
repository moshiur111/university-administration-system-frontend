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
    <Card title="Create Course" style={{ maxWidth: 700, margin: "0 auto" }}>
      <UMForm onSubmit={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <UMInput label="Title" name="title" />
          </Col>

          <Col span={12}>
            <UMInput label="Prefix" name="prefix" />
          </Col>

          <Col span={12}>
            <UMInput label="Code" name="code" type="number" />
          </Col>

          <Col span={12}>
            <UMInput label="Credits" name="credits" type="number" />
          </Col>

          <Col span={24}>
            <UMSelect
              mode="multiple"
              options={preRequisiteCoursesOptions}
              name="preRequisiteCourses"
              label="Pre-requisite Courses"
            />
          </Col>
        </Row>

        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!preRequisiteCoursesOptions?.length}
          >
            Create Course
          </Button>
        </div>
      </UMForm>
    </Card>
  );
};

export default CreateCourseForm;
