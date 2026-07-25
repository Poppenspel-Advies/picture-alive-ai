"""test routes validation"""
from routes import MODE_MAP


def test_mode_map_complete():
    assert MODE_MAP == {
        "audio-guide": "audio_guide",
        "story-creator": "story_creator",
        "historical-guide": "historical_guide",
        "creative-studio": "creative_studio",
    }


def test_health_endpoint(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert "version" in data


def test_invalid_mode(client):
    resp = client.post("/api/modes/fake-mode/analyze")
    assert resp.status_code == 422  # invalid mode → 422


def test_no_file(client):
    resp = client.post("/api/modes/audio-guide/analyze")
    assert resp.status_code == 422  # missing file → 422


def test_wrong_content_type(client):
    resp = client.post(
        "/api/modes/audio-guide/analyze",
        files={"image": ("test.pdf", "", "application/pdf")},
    )
    assert resp.status_code == 415  # unsupported media type