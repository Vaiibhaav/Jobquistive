import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text, text_bold, text_opp_details }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <strong id="boldd">
        <span className="text-bold">{text_bold}</span>
      </strong>
      <span id="text-opp-details">{text_opp_details}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
