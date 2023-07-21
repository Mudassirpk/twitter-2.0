import React from "react";
import Tab from "../ui/Tab";
import Tabs from "../ui/Tabs";

type Props = {};

function ProfileContent({}: Props) {
  return (
    <section className="w-full">
      <Tabs>
        <Tab title="Tweets" selected={true} />
        <Tab title="Likes" selected={false} />
      </Tabs>
    </section>
  );
}

export default ProfileContent;
