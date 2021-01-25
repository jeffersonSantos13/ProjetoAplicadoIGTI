import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #F5F5F5;
  height: auto;
`;

export const ProfileIcon = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
`;

export const DesireContainer = styled.View`
  width: 100%;
  height: 90px;
  margin-top: 10px;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1;
  background: #fff;
  padding: 10px;
`;

export const DesireTitle = styled.Text`
  font-size: 22px;
  color: #44C52F;
  font-family: 'RobotoSlab-Medium';
  border-bottom-color: #80F26D;
  border-bottom-width: 1;
  margin-bottom: 10px;
`;

export const DesireParaghaph = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: 'RobotoSlab-Regular';
`;

export const SchenduleContainer = styled.View`
  width: 100%;
  padding: 10px;
  margin-top: 35px;
  background: #fff;
`;

export const SchenduleTitle = styled.Text`
  font-size: 24px;
  color: #44C52F;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 10px;
`;

export const Card = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-top-color: #80F26D;
  border-top-width: 1;
  overflow: hidden;
`;

export const CardItem = styled.View`
  margin-left: 5px;
  flex-direction: column;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  color: #44C52F;
  font-family: 'RobotoSlab-Medium';  
`;


export const RecipeContainer = styled.View`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-bottom-color: #E0E0E0;
  border-bottom-width: 1;
  background: #fff;
  padding: 10px;
`;

export const RecipeParaghaph = styled.Text`
  font-family: 'RobotoSlab-Medium'; 
  font-weight: bold;
  margin-top: 5px;
`;

export const BulletRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1;

`;

