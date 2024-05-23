
import useUser from "../hooks/useUser";

function Dashboard() {
  const { userAll } = useUser()!;

  const dataDash = [
    {
      key: "1",
      head: "1234",
      title: "element 01",
    },
    {
      key: "2",
      head: "2345",
      title: "element 02",
    },
    {
      key: "3",
      head: "3456",
      title: "element 03",
    },
    {
      key: "4",
      head: "4567",
      title: "element 04",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full my-4">
      <hr />
      <p className="text-center shadow-md rounded-md p-2 mx-auto">
        รายการสรุปของระบบ
      </p>
      <hr />
      <div className="max-w-[80rem] mx-auto my-2">
        <div className="flex flex-wrap justify-around gap-5">
          {dataDash.map((el) => (
            <div
              className="w-[200px] h-[200px] shadow-md rounded-md p-2"
              key={el.key}
            >
              <div className="flex flex-col justify-center text-center items-center h-full">
                <p>{el.head}</p>
                <p>{el.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
