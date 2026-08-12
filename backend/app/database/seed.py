from app.database.db import Base, engine, SessionLocal
from app.models.models import BusinessModel, UserModel, OfferModel, BookingModel

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing
    db.query(BusinessModel).delete()
    db.query(UserModel).delete()
    db.query(OfferModel).delete()

    # Add Demo Users
    u1 = UserModel(id="u-demo-1", name="Rahul Sharma", email="user@dostai.demo", role="USER", password_hash="demo_hash_1")
    u2 = UserModel(id="b-owner-1", name="City Mall Manager", email="business@dostai.demo", role="BUSINESS", password_hash="demo_hash_2")
    db.add_all([u1, u2])

    # Add Demo Businesses
    b1 = BusinessModel(
        id="b-city-mall",
        name="City Mall",
        category="Malls",
        rating=4.8,
        review_count=1240,
        distance_km=1.2,
        address="Central Boulevard, Sector 18",
        image_url="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
        opening_hours="10:00 AM - 11:00 PM",
        current_crowd="Medium",
        predicted_wait_minutes=14,
        avg_price=450.0,
        has_offer=True,
        offer_text="₹350 OFF Movie + Dinner Combo"
    )

    b2 = BusinessModel(
        id="b-cinemax",
        name="CineMax Multiplex",
        category="Cinemas",
        rating=4.6,
        review_count=890,
        distance_km=1.5,
        address="Level 3, City Mall, Sector 18",
        image_url="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        opening_hours="09:00 AM - 12:00 AM",
        current_crowd="High",
        predicted_wait_minutes=18,
        avg_price=300.0,
        has_offer=True,
        offer_text="15% OFF Student Ticket"
    )

    b3 = BusinessModel(
        id="b-spice-route",
        name="Spice Route Bistro",
        category="Restaurants",
        rating=4.7,
        review_count=650,
        distance_km=1.3,
        address="Ground Floor, City Mall, Sector 18",
        image_url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        opening_hours="11:00 AM - 11:00 PM",
        current_crowd="Medium",
        predicted_wait_minutes=10,
        avg_price=400.0,
        has_offer=True,
        offer_text="20% OFF Total Bill over ₹1500"
    )

    db.add_all([b1, b2, b3])

    # Add Offers
    o1 = OfferModel(
        id="off-01",
        business_id="b-city-mall",
        business_name="City Mall Combo Special",
        title="City Night Out Offer",
        discount_text="₹350 OFF",
        discount_value=350.0,
        category="Malls",
        valid_until="Today, 11:59 PM",
        min_order=1500.0,
        code="DOSTCITY350"
    )
    db.add(o1)

    db.commit()
    db.close()
    print("Database seeded successfully with DostAI demo data.")

if __name__ == "__main__":
    seed_db()
