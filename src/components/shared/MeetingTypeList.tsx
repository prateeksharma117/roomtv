"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import HomeCards from "./HomeCards";
import { BiSolidVideoRecording } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineUserAdd } from "react-icons/ai";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "../ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const user = useUser();
  const client = useStreamVideoClient();
  const [value, setValue] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = value.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!value.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "✅ Meeting created",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "❌ Failed to create the meeting",
      });
    }
  };

  const validation = () => {
    if (!value.dateTime) {
      toast({
        variant: "destructive",
        title: "❌ Please select date and time",
      });
      return;
    }

    if (!value.description) {
      toast({
        variant: "destructive",
        title: "❌ Add a description of your meeting to continue",
      });
      return;
    }
    createMeeting();
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_HOST_WEBSITE}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCards
        icon={<FaPlus size={24} color="white" />}
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCards
        icon={<AiOutlineCalendar size={24} color="white" />}
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-purple-1"
      />
      <HomeCards
        icon={<AiOutlineUserAdd size={24} color="white" />}
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
      />
      <HomeCards
        icon={<BiSolidVideoRecording size={24} color="white" />}
        title="View Recording"
        description="Checkout your meeting"
        handleClick={() => router.push("/recordings")}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className=""
          buttonText=""
          handleClick={validation}
        >
          <div className=" flex flex-col gap-2.5">
            <label className=" text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className=" border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValue({ ...value, description: e.target.value });
              }}
            />
          </div>

          <div className=" flex flex-col w-full gap-2.5">
            <label className=" text-base text-normal leading-[22px] text-sky-2">
              Select date and time
            </label>
            <DatePicker
              selected={value.dateTime}
              onChange={(date) => setValue({ ...value, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className=" w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          buttonText="Copy meeting link"
          image="/icons/checked.png"
          buttonIcon="/icons/copy_icon.png"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(value?.link)}
      >
        <div className=" flex flex-col gap-2.5">
          <label className=" text-base text-normal leading-[22px] text-sky-2">
            Past your link
          </label>
          <Input
            className=" border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setValue({ ...value, link: e.target.value });
            }}
          />
        </div>
      </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
