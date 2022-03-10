import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Container = styled.div`
  @media screen and (min-width: 480px) {
    width: 480px;
    margin: 0 auto;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  min-height: 100vh;
  padding: 24px 24px 100px 24px;
  padding-bottom: 0;
  background-color: ${(props) => (props?.bgColor ? props?.bgColor : 'none')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
Container.propTypes = {
  //객체를 가진 배열을 proptype로 받음
  bgColor: PropTypes.string,
};
export default Container;
