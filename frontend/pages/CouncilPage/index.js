import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import DetailLayout from "../../layouts/DetailLayout";
import ButtonComponent from "../../components/ButtonComponent";
import { useEffect, useState } from "react";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import MemberItem from "./MemberItem";
import ThesisItem from "../ThesesPage/ThesisItem";

const COUNCIL_ROLES = [
  { label: "Chủ tịch", value: "CHAIRMAN" },
  { label: "Thư ký", value: "SECRETARY" },
  { label: "Phản biện", value: "REVIEWER" },
  { label: "Thành viên", value: "MEMBER" },
];

function CouncilPage({ navigation, route }) {
  const { token, councilId, dropdownTheses, dropdownLecturers } = route.params;
  const [council, setCouncil] = useState(null);

  const [members, setMembers] = useState(null);
  const [membersInfo, setMembersInfo] = useState(null);

  const [thesesChoice, setThesesChoice] = useState(null);
  const [thesesCouncil, setThesesCouncil] = useState(null);

  const loadCouncil = async () => {
    try {
      let response = await authAPIWithoutParams(token).get(
        endpoints.council(councilId)
      );
      setCouncil(response.data);
      setMembers(response.data.members);

      let theses = await authAPIWithoutParams(token).get(
        endpoints.councilTheses(councilId)
      );
      setThesesChoice(theses.data.map((thesis) => thesis.id));

      for (let thesis of theses.data) {
        dropdownTheses.push({
          label: thesis.title,
          value: thesis.id,
        });
      }

      console.log(dropdownTheses);
    } catch (ex) {
      console.error(ex);
      setCouncil(null);
      setMembers(null);
    }
  };

  const loadCouncilTheses = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.councilTheses(councilId)
      );

      setThesesCouncil(response.data);
    } catch (ex) {
      console.error(ex);
      setThesesCouncil(null);
    }
  };

  const loadMembers = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.councilMembers(councilId)
      );
      setMembersInfo(response.data);
    } catch (ex) {
      console.error(ex);
      setMembersInfo(null);
    }
  };

  const updateMembers = async (selected) => {
    try {
      await authAPIWithoutParams(token).post(
        endpoints.updateCouncilMembers(councilId),
        {
          members: selected,
        }
      );
      setMembers(selected);
    } catch (ex) {
      console.error(ex);
    }
  };

  const updateTheses = async (selected) => {
    try {
      await authAPIWithoutParams(token).patch(
        endpoints.updateCouncilTheses(councilId),
        {
          theses: selected,
        }
      );
      setThesesChoice(selected);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadCouncil();
  }, [councilId]);

  useEffect(() => {
    loadMembers();
  }, [members]);

  useEffect(() => {
    loadCouncilTheses();
  }, [thesesChoice]);

  const handleToggleLock = async () => {
    let response = await authAPIWithoutParams(token).patch(
      endpoints.toggleCouncil(councilId)
    );
    setCouncil(response.data);
  };

  const actions = () => (
    <>
      <ButtonComponent
        style={{ container: { width: 180, backgroundColor: "red" } }}
        onClick={handleToggleLock}
      >
        {council && council.is_active ? "Khóa" : "Mở khóa"}
      </ButtonComponent>
    </>
  );

  const onChangeSelectedMembers = (selected) => {
    updateMembers(selected);
  };

  const onChangeSelectedTheses = (selected) => {
    updateTheses(selected);
  };

  const onChangeRole = (id, role) => {
    if (membersInfo) {
      const updateRole = async () => {
        await authAPIWithoutParams(token).patch(
          endpoints.updateCouncilMemberRole(councilId),
          {
            user_id: id,
            role: role,
          }
        );
      };
      updateRole();
    }
  };

  return (
    <DetailLayout
      title="Chi tiết hội đồng"
      toParentPage={() =>
        navigation.navigate("CouncilsPage", {
          token: token,
          updated: Math.random(),
        })
      }
      style={{
        actions: { flex: 2, justifyContent: "center" },
        children: {},
      }}
      childrenActions={actions()}
    >
      {council === null ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title}>{council.name}</Text>
          <View style={styles.status}>
            <Text>Trạng thái: </Text>
            <Text style={{ color: "red" }}>
              {council.is_active ? "Chưa khóa" : "Đã khóa"}
            </Text>
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginVertical: 14 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, padding: 8 }}>
              Các thành viên hội đồng
            </Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#0c56d0",
                padding: 8,
              }}
            >
              <Text style={{ flex: 1, color: "#ccc" }}>ID</Text>
              <Text style={{ flex: 4, color: "#ccc" }}>Họ và tên</Text>
              <Text style={{ flex: 5, color: "#ccc" }}>Vai trò</Text>
            </View>
            {membersInfo === null ? (
              <ActivityIndicator />
            ) : (
              <>
                {membersInfo.map((info) => (
                  <MemberItem
                    info={info}
                    roles={COUNCIL_ROLES}
                    onChangeRole={(role) => onChangeRole(info.user, role)}
                    key={info.id}
                  />
                ))}
              </>
            )}
          </View>
          <View style={{ width: "100%" }}>
            <MultiSelectComponent
              data={dropdownLecturers}
              selected={members}
              onChangeSelected={onChangeSelectedMembers}
              placeholder="Thành viên hội đồng..."
              hide
              maxSelect={5}
            />
          </View>
          <View
            style={{ width: "100%", alignItems: "center", marginVertical: 14 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, padding: 8 }}>
              Khóa luận
            </Text>
            <View
              style={[
                {
                  flexDirection: "row",
                  backgroundColor: "#0c56d0",
                  padding: 8,
                },
              ]}
            >
              <Text style={{ flex: 1, color: "#ccc" }}>ID</Text>
              <Text style={{ flex: 4, color: "#ccc" }}>Đề tài</Text>
              <Text style={{ flex: 3, color: "#ccc" }}>Ngày tạo</Text>
              <Text style={{ flex: 3, color: "#ccc" }}>Trạng thái</Text>
            </View>
            {thesesCouncil === null ? (
              <ActivityIndicator />
            ) : (
              <>
                {thesesCouncil.map((thesis) => (
                  <ThesisItem
                    key={thesis.id}
                    thesis={thesis}
                    style={{
                      container: { width: "100%", borderColor: "#0c56d0" },
                    }}
                  />
                ))}
              </>
            )}
          </View>
          <View style={{ width: "100%" }}>
            <MultiSelectComponent
              data={dropdownTheses}
              selected={thesesChoice}
              onChangeSelected={onChangeSelectedTheses}
              placeholder="Khóa luận..."
              maxSelect={5}
              hide
            />
          </View>
        </>
      )}
    </DetailLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "600" },
  status: { flexDirection: "row", alignItems: "center" },
  filesField: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    position: "relative",
    paddingHorizontal: 10,
  },
  fileText: {
    borderColor: "#000",
    borderWidth: 1,
    width: 280,
    padding: 14,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    height: 46,
    marginTop: 10,
  },
});

export default CouncilPage;
