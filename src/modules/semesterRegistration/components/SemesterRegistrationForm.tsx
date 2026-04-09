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
      style={{ borderRadius: 12 }}
      styles={{ body: { padding: "16px 20px" } }}
    >
      <UMForm onSubmit={onSubmit}>
        <Row gutter={[12, 12]}>
          {/* Academic Semester */}
          <Col xs={24}>
            <UMSelect
              label="Academic Semester"
              name="academicSemester"
              options={academicSemesterOptions}
            />
          </Col>

          {/* Dates */}
          <Col xs={24} sm={12}>
            <UMDatePicker label="Start Date" name="startDate" />
          </Col>

          <Col xs={24} sm={12}>
            <UMDatePicker label="End Date" name="endDate" />
          </Col>

          {/* Credits */}
          <Col xs={24} sm={12}>
            <UMInput label="Min Credit" name="minCredit" type="number" />
          </Col>

          <Col xs={24} sm={12}>
            <UMInput label="Max Credit" name="maxCredit" type="number" />
          </Col>
        </Row>

        {/* Submit Button */}
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!academicSemesterOptions?.length}
            block // full width on mobile
          >
            Create Registration
          </Button>
        </div>
      </UMForm>
    </Card>
  );
};

export default SemesterRegistrationForm;
