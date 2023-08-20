import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  #text-opp-details{
    color: var(--grey-600)
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .text-bold {
    color: var(--grey-600)
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin-right: 0.25rem;
  }
  #boldd {
    color: var(--grey-600);
  }
`;
export default Wrapper;
