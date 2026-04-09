// // import { Button, Result } from "antd";
// // import { Link } from "react-router-dom";

// // const NotFound = () => {
// //   return (
// //     <Result
// //       status="404"
// //       title="404"
// //       subTitle="Sorry, the page you visited does not exist."
// //       extra={
// //         <Link to="/">
// //           <Button type="primary">Back to Home</Button>
// //         </Link>
// //       }
// //     />
// //   );
// // };

// // export default NotFound;

// import { Button, Typography } from "antd";
// import { Link } from "react-router-dom";

// const { Title, Text } = Typography;

// const NotFound = () => {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "24px",
//         background: "#fafafa",
//       }}
//     >
//       <div
//         style={{
//           textAlign: "center",
//           maxWidth: 480,
//           width: "100%",
//         }}
//       >
//         {/* 404 Code */}
//         <Title
//           style={{
//             fontSize: "64px",
//             marginBottom: 0,
//             lineHeight: 1,
//           }}
//         >
//           404
//         </Title>

//         {/* Title */}
//         <Title level={3} style={{ marginTop: 8 }}>
//           Page not found
//         </Title>

//         {/* Description */}
//         <Text
//           type="secondary"
//           style={{
//             display: "block",
//             marginBottom: 24,
//             fontSize: 16,
//           }}
//         >
//           The page you’re looking for doesn’t exist or has been moved.
//         </Text>

//         {/* Actions */}
//         <div
//           style={{
//             display: "flex",
//             gap: 12,
//             justifyContent: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <Link to="/">
//             <Button type="primary" size="large">
//               Go Home
//             </Button>
//           </Link>

//           <Button size="large" onClick={() => window.history.back()}>
//             Go Back
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import { Button, Typography } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)",
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ textAlign: "center", maxWidth: 480, width: "100%" }}
      >
        <motion.div variants={item}>
          <Title style={{ fontSize: "64px", marginBottom: 0, lineHeight: 1 }}>
            404
          </Title>
        </motion.div>

        <motion.div variants={item}>
          <Title level={3} style={{ marginTop: 8 }}>
            Page not found
          </Title>
        </motion.div>

        <motion.div variants={item}>
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: 24, fontSize: 16 }}
          >
            The page you’re looking for doesn’t exist or has been moved.
          </Text>
        </motion.div>

        <motion.div
          variants={item}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button type="primary" size="large">
                Go Home
              </Button>
            </motion.div>
          </Link>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button size="large" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
