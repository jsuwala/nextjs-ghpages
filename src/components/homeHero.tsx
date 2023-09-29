import {    Card, CardBody    } from "@nextui-org/card";
import {    Spacer  } from "@nextui-org/spacer";
import {     Text  } from "@nextui-org/text";

export default function HomeHero() {
    return (
        <div className="homeHero">
          <Spacer y={2} />
          <div className="contrainer">
            <Card variant="bordered">
              <CardBody css={{ padding: "$24" }}>
                <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>
                  Welcome to NextUI + Next.js Shopping app
                </Text>
                <Text size={24}>
                  This is a simple shopping app built with NextUI and Next.js.
                  This is a demo app to showcase NextUI components.
                </Text>
              </CardBody>
            </Card>
          </div>
        </div>
    );
}