import { Button, Card, Col, Row } from "antd";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";

type TProps = {
  onSubmit: (
    data: FieldValues,
    methods: UseFormReturn<FieldValues>,
  ) => Promise<void>;
  academicSemesterOptions: { label: string; value: string }[];
  isLoading: boolean;
};

const SemesterRegistrationForm = ({
  onSubmit,
  academicSemesterOptions,
  isLoading,
}: TProps) => {
  return (
    <Card
      title="Create Semester Registration"
      style={{ maxWidth: 700, margin: "0 auto" }}
    >
      <UMForm onSubmit={onSubmit}>
        <Row gutter={16}>
          {/* Academic Semester */}
          <Col span={24}>
            <UMSelect
              label="Academic Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            />
          </Col>

          {/* Dates */}
          <Col span={12}>
            <UMDatePicker label="Start Date" name="startDate" />
          </Col>

          <Col span={12}>
            <UMDatePicker label="End Date" name="endDate" />
          </Col>

          {/* Credits */}
          <Col span={12}>
            <UMInput label="Min Credit" name="minCredit" type="number" />
          </Col>

          <Col span={12}>
            <UMInput label="Max Credit" name="maxCredit" type="number" />
          </Col>
        </Row>

        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!academicSemesterOptions?.length}
          >
            Create Registration
          </Button>
        </div>
      </UMForm>
    </Card>
  );
};

export default SemesterRegistrationForm;
