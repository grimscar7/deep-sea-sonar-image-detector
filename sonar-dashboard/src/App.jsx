import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('')
  const [detections, setDetections] = useState([])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageURL = URL.createObjectURL(file)

      setImage(imageURL)
      setFileName(file.name)
      setDetections([])
    }
  }

  const handleDetect = () => {
    setDetections([
      {
        label: 'Marine Debris',
        confidence: 94,
        type: 'High confidence'
      },
      {
        label: 'Possible Rock',
        confidence: 87,
        type: 'Medium confidence'
      },
      {
        label: 'Unknown Anomaly',
        confidence: 76,
        type: 'Review required'
      }
    ])
  }

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">S</div>

          <div>
            <h2>SONAR AI</h2>
            <span>Detection System</span>
          </div>
        </div>

        <nav>
          <div className="nav-item active">
            <span>▦</span>
            Dashboard
          </div>

          <div className="nav-item">
            <span>◉</span>
            Scan Analysis
          </div>

          <div className="nav-item">
            <span>▤</span>
            Scan History
          </div>

          <div className="nav-item">
            <span>⚙</span>
            Settings
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="system-label">
            <span className="online-dot"></span>
            System Online
          </div>

          <p>AI-assisted underwater<br />image analysis</p>
        </div>

      </aside>


      {/* MAIN AREA */}
      <div className="main">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <span className="breadcrumb">Workspace / Dashboard</span>
          </div>

          <div className="top-status">
            <span className="online-dot"></span>
            Processing Engine Ready
          </div>

        </header>


        {/* CONTENT */}
        <main className="content">

          <div className="page-heading">

            <div>
              <h1>Sonar Analysis Dashboard</h1>
              <p>
                Detect and analyse underwater objects from sonar imagery.
              </p>
            </div>

            <div className="scan-badge">
              AI Detection
            </div>

          </div>


          {/* STAT CARDS */}
          <section className="stats">

            <div className="stat-card">
              <div className="stat-icon blue">◎</div>

              <div>
                <span>Objects Detected</span>
                <strong>{detections.length}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">✓</div>

              <div>
                <span>Highest Confidence</span>
                <strong>
                  {detections.length
                    ? `${Math.max(...detections.map(d => d.confidence))}%`
                    : '--'}
                </strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">◷</div>

              <div>
                <span>Last Scan</span>
                <strong>
                  {detections.length ? 'Just now' : '--'}
                </strong>
              </div>
            </div>

          </section>


          {/* WORKSPACE */}
          <section className="workspace">

            {/* LEFT */}
            <div className="panel">

              <div className="panel-header">
                <div>
                  <h2>Sonar Image</h2>
                  <p>Upload an image to begin analysis</p>
                </div>

                {image && (
                  <span className="file-type">IMAGE</span>
                )}
              </div>


              {!image ? (

                <label className="drop-zone">

                  <div className="upload-symbol">
                    ↑
                  </div>

                  <h3>Upload sonar imagery</h3>

                  <p>
                    Select a sonar image from your computer
                  </p>

                  <span className="browse-button">
                    Browse Image
                  </span>

                  <small>
                    JPG, JPEG or PNG · Maximum 10 MB
                  </small>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                </label>

              ) : (

                <div className="image-area">

                  <div className="image-wrapper">

                    <img
                      src={image}
                      alt="Uploaded sonar"
                    />

                    <div className="image-label">
                      SONAR IMAGE
                    </div>

                  </div>

                  <div className="file-info">
                    <span>{fileName}</span>

                    <label className="change-file">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <button
                    className="detect-button"
                    onClick={handleDetect}
                  >
                    <span>◎</span>
                    Analyse Image
                  </button>

                </div>

              )}

            </div>


            {/* RIGHT */}
            <div className="panel results-panel">

              <div className="panel-header">

                <div>
                  <h2>Detection Results</h2>
                  <p>Objects identified by the AI model</p>
                </div>

                <span className="result-count">
                  {detections.length} objects
                </span>

              </div>


              {detections.length === 0 ? (

                <div className="empty-results">

                  <div className="radar-icon">
                    ◎
                  </div>

                  <h3>Awaiting analysis</h3>

                  <p>
                    Upload a sonar image and start analysis
                    to view detected objects.
                  </p>

                </div>

              ) : (

                <div className="results">

                  {detections.map((item, index) => (

                    <div
                      className="result"
                      key={index}
                    >

                      <div className="result-index">
                        0{index + 1}
                      </div>

                      <div className="result-details">

                        <div className="result-title">
                          <h3>{item.label}</h3>

                          <span className={
                            index === 0
                              ? 'priority high'
                              : index === 1
                                ? 'priority medium'
                                : 'priority low'
                          }>
                            {index === 0
                              ? 'High'
                              : index === 1
                                ? 'Medium'
                                : 'Low'}
                          </span>
                        </div>

                        <div className="confidence-row">

                          <span>
                            Confidence
                          </span>

                          <strong>
                            {item.confidence}%
                          </strong>

                        </div>

                        <div className="confidence-bar">
                          <div
                            style={{
                              width: `${item.confidence}%`
                            }}
                          ></div>
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </section>


          {/* BOTTOM INFORMATION */}
          <section className="information">

            <div>
              <span className="info-icon">◈</span>

              <div>
                <h3>AI-assisted detection</h3>
                <p>
                  Identifies potential marine debris and
                  underwater anomalies from sonar imagery.
                </p>
              </div>
            </div>

            <div>
              <span className="info-icon">◉</span>

              <div>
                <h3>Decision support</h3>
                <p>
                  Confidence scores help operators prioritise
                  objects for further inspection.
                </p>
              </div>
            </div>

            <div>
              <span className="info-icon">✓</span>

              <div>
                <h3>Research ready</h3>
                <p>
                  Designed as an interface for intelligent
                  marine monitoring workflows.
                </p>
              </div>
            </div>

          </section>

        </main>

        <footer>
          Sonar AI Detection System · Underwater Marine Monitoring
        </footer>

      </div>

    </div>
  )
}

export default App