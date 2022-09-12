import type { NextPage } from "next";
import { EditHeader } from "../../../../components/editMenu/EditHeader";
import { useRouter } from "next/router";
import EditMenuItem from "../../../../components/editMenu/EditMenuItem";
import { useRecoilValue } from "recoil";
import { useMenuCards } from "../../../../hooks/useMenuCard";
import { editMenuState } from "../../../../states/EditMenuState";
import { Container } from "../../../../components/common/Container";

const Edit: NextPage = () => {
  const router = useRouter();
  const { menuCards, removeMenuCard } = useMenuCards();
  const menuCard = useRecoilValue(editMenuState);
  const index = menuCards.findIndex(
    (menuCard) => menuCard.id == Number(router.query.menuID)
  );

  return (
    <Container>
      {router.isReady && <EditHeader />}
      <div className="m-10 flex justify-center">
        <EditMenuItem
          key={menuCard.id}
          index={index}
          menu={menuCard}
          removeMenuCard={removeMenuCard}
        />
      </div>
    </Container>
  );
};

export default Edit;
