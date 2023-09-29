import {    Card, CardBody    } from "@nextui-org/card";
import {    Spacer  } from "@nextui-org/spacer";


export default function HomeHero() {
    return (
        <div className="homeHero">
          <Spacer y={2} />
          <div className="contrainer">
            <Card >
              <CardBody className=" p-24 text-center ">
                <h1  className="textGradient: '45deg, $blue600 -20%, $pink600 50%'; text-2xl ">
                  Welcome to NextUI + Next.js Shopping app
                </h1>
                <div className="text-xl">
                  This is a simple shopping app built with NextUI and Next.js.
                  This is a demo app to showcase NextUI components.
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
    );
}