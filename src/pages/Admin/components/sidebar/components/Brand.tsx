import { Flex, useColorModeValue, Image } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";
// import Logo from "/src/assets/admin/logo.png";
import adminLogo from "/src/assets/admin/admin_logo.png";
export function SidebarBrand() {
  // Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column" >
      <Image
        src={adminLogo} // Update with your actual image path
        alt="Logo"
        h="auto"
        w="90%"
        mx="auto"
        filter={logoColor === "white" ? "invert(1)" : "none"} // Optionally apply filter for dark mode
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
