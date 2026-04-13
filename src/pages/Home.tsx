import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

type Request = {
  _id: string;
  requestId: number;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  accountType?: string;
  accountRelatedTo?: string;
  accountNo?: string;
  branchEmail?: string;
  acknowledgement?: string;
  openingYear?: string;
  businessDescription?: string;
  businessDocs?: string;
  bankStatement?: string;
  proof?: string;
  noc?: string;
  reason?: string;
  identityType?: string;
  status: string;
};

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Request | null>(null);

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://cyberrajasthan.online/api/request"
      );
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">📋 Admin Dashboard</h2>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id} onClick={() => setSelected(item)}>
                <td>{item.requestId}</td>
                <td>{item.name || "-"}</td>
                <td>{item.mobile || "-"}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔥 MODAL */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <h3>📄 Request Details</h3>

            <p><b>Name:</b> {selected.name}</p>
            <p><b>Mobile:</b> {selected.mobile}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Address:</b> {selected.address}</p>
            <p><b>Account No:</b> {selected.accountNo}</p>
            <p><b>Branch Email:</b> {selected.branchEmail}</p>
            <p><b>Opening Year:</b> {selected.openingYear}</p>
            <p><b>Business Desc:</b> {selected.businessDescription}</p>
            <p><b>Reason:</b> {selected.reason}</p>

            {/* Images */}
            <div className="images">
              {selected.businessDocs && (
                <img src={selected.businessDocs} alt="doc" />
              )}
              {selected.bankStatement && (
                <img src={selected.bankStatement} alt="bank" />
              )}
              {selected.proof && (
                <img src={selected.proof} alt="proof" />
              )}
              {selected.noc && (
                <img src={selected.noc} alt="noc" />
              )}
            </div>

            <button onClick={() => setSelected(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;