import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import ThesisItem from "../ThesesPage/ThesisItem";
import MultiSelectComponent from "../../components/MultiSelectComponent";
import DropdownComponent from "../../components/Dropdown";

const SCREEN_WIDTH = Dimensions.get("window").width;

const COUNCIL_ROLES = [
  { label: "Chủ tịch", value: "CHAIRMAN" },
  { label: "Thư ký", value: "SECRETARY" },
  { label: "Phản biện", value: "REVIEWER" },
  { label: "Thành viên", value: "MEMBER" },
];

function CouncilDetail({ council, handleToggleLock, token }) {
  const [current, setCurrent] = useState(0);

  // use for council detail
  const [dropdownTheses, setDropdownTheses] = useState([]);
  const { lecturers } = useSelector((state) => state.lecturersInfo);

  const [members, setMembers] = useState([]);
  const [theses, setTheses] = useState([]);

  const loadDropdownTheses = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.activeTheses
      );

      let transformData = response.data.results
        .filter(
          (thesis) =>
            thesis.council === null || thesis.council.id === council.id
        )
        .map((thesis) => ({ label: thesis.title, value: thesis.id }));

      setDropdownTheses(transformData);
    } catch (ex) {
      console.error(ex);
      setDropdownTheses([]);
    }
  };

  const loadTheses = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.councilTheses(council.id)
      );

      setTheses(response.data);
    } catch (ex) {
      console.error(ex);
      setTheses([]);
    }
  };

  const loadMembers = async () => {
    try {
      const response = await authAPIWithoutParams(token).get(
        endpoints.councilMembers(council.id)
      );
      setMembers(response.data);
    } catch (ex) {
      console.error(ex);
      setMembers([]);
    }
  };

  const updateMembers = async (selected) => {
    try {
      console.log(selected);
      await authAPIWithoutParams(token).post(
        endpoints.updateCouncilMembers(council.id),
        {
          members: selected,
        }
      );
      loadMembers();
    } catch (ex) {
      console.error(ex);
    }
  };

  const updateTheses = async (selected) => {
    console.log(selected);
    try {
      await authAPIWithoutParams(token).patch(
        endpoints.updateCouncilTheses(council.id),
        {
          theses: selected,
        }
      );
      loadTheses();
    } catch (ex) {
      console.error(ex);
    }
  };

  const onChangeRole = (id, role) => {
    const updateRole = async () => {
      await authAPIWithoutParams(token).patch(
        endpoints.updateCouncilMemberRole(council.id),
        {
          user_id: id,
          role: role,
        }
      );
    };
    updateRole();
  };

  useEffect(() => {
    loadDropdownTheses();
    loadMembers();
    loadTheses();
  }, [council]);

  return (
    <View style={{ width: SCREEN_WIDTH * 0.85 }}>
      {current === 0 && (
        <>
          <Text style={styles.title}>{council.name}</Text>
          <View style={styles.status}>
            <Text>Trạng thái: </Text>
            <Text style={{ color: "red" }}>
              {council.is_active ? "Chưa khóa" : "Đã khóa"}
            </Text>
          </View>
          <ButtonComponent
            primary
            rounded
            style={{ container: { height: 50, marginVertical: 20 } }}
            onClick={handleToggleLock}
          >
            {council.is_active ? "Khóa hội đồng" : "Mở hội đồng"}
          </ButtonComponent>
        </>
      )}
      {current === 1 && (
        <>
          <View>
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
            {members === null ? (
              <ActivityIndicator />
            ) : (
              <>
                {members.map((info) => (
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
              data={lecturers}
              selected={members.map((member) => member.user)}
              onChangeSelected={updateMembers}
              placeholder="Thành viên hội đồng..."
              hide
              maxSelect={5}
            />
          </View>
        </>
      )}
      {current === 2 && (
        <>
          <View>
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
              <Text style={{ flex: 3, color: "#ccc" }}>Thời gian</Text>
              <Text style={{ flex: 3, color: "#ccc" }}>Trạng thái</Text>
            </View>
            {theses === null ? (
              <ActivityIndicator />
            ) : (
              <>
                {theses.map((thesis) => (
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
              selected={theses.map((thesis) => thesis.id)}
              onChangeSelected={updateTheses}
              placeholder="Khóa luận..."
              maxSelect={5}
              hide
            />
          </View>
        </>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: current !== 1 ? "center" : "space-between",
        }}
      >
        {current !== 0 && (
          <ButtonComponent onClick={() => setCurrent((prev) => prev - 1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </ButtonComponent>
        )}
        {current !== 2 && (
          <ButtonComponent onClick={() => setCurrent((prev) => prev + 1)}>
            <FontAwesomeIcon icon={faArrowRight} />
          </ButtonComponent>
        )}
      </View>
    </View>
  );
}

const MemberItem = ({ info, roles, onChangeRole }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 8,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#0c56d0",
      }}
    >
      <Text style={{ flex: 1, fontSize: 14 }}>{info.user}</Text>
      <Text style={{ flex: 4, fontSize: 14 }}>
        {`${info.first_name} ${info.last_name}`}
      </Text>
      <View style={{ flex: 5 }}>
        <DropdownComponent
          style={{ dropdownContainer: { width: "100%", borderWidth: 0 } }}
          value={info.council_role}
          onChange={onChangeRole}
          data={roles}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "flex-end" },
  searchBox: {
    inputBox: {
      width: "100%",
      marginBottom: 20,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  status: {
    flexDirection: "row",
    justifyContent: "center",
  },
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

export default CouncilDetail;
