import { Button, Typography } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Title, Text } = Typography;

const ComingSoon = ({ feature }: { feature: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleInterest = () => {
    setClicked(true);
    console.log(`${feature} interest clicked`);
    toast.success("You're on the list 🚀");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <Title level={3}>🚧 {feature} Coming Soon</Title>

      <Text type="secondary">
        This feature is under development and will be available soon.
      </Text>

      <div style={{ marginTop: 20 }}>
        <Button type="primary" onClick={handleInterest} disabled={clicked}>
          {clicked ? "Added ✓" : "I'm interested 👀"}
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
