import streamlit as st
import numpy as np
import pickle

# Load the trained heart disease prediction model
with open('heart_disease_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Streamlit App Title
st.title("Heart Disease Prediction")

# Input Fields for User Data
st.write("Enter the required details:")

age = st.number_input("Age", min_value=1, max_value=120, value=25)
sex = st.selectbox("Sex (1 = Male, 0 = Female)", [0, 1])
cp = st.selectbox("Chest Pain Type (0-3)", [0, 1, 2, 3])
trestbps = st.number_input("Resting Blood Pressure", min_value=50, max_value=200, value=120)
chol = st.number_input("Serum Cholesterol (mg/dl)", min_value=100, max_value=500, value=200)
fbs = st.selectbox("Fasting Blood Sugar > 120 mg/dl (1 = Yes, 0 = No)", [0, 1])
restecg = st.selectbox("Resting Electrocardiographic Results (0-2)", [0, 1, 2])
thalach = st.number_input("Maximum Heart Rate Achieved", min_value=50, max_value=250, value=150)
exang = st.selectbox("Exercise Induced Angina (1 = Yes, 0 = No)", [0, 1])
oldpeak = st.number_input("ST Depression Induced by Exercise", min_value=0.0, max_value=10.0, value=1.0)
slope = st.selectbox("Slope of the Peak Exercise ST Segment (0-2)", [0, 1, 2])
ca = st.selectbox("Number of Major Vessels (0-4)", [0, 1, 2, 3, 4])
thal = st.selectbox("Thalassemia (1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect)", [1, 2, 3])

# Prepare the input features array
features = np.array([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])

# Predict button
if st.button("Predict"):
    prediction = model.predict(features)
    result = "Positive for Heart Disease" if prediction[0] == 1 else "Negative for Heart Disease"
    st.write(f"Prediction: {result}")