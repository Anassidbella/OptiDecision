from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
import numpy as np
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Profile

class CalculateWeightsView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.get('pairwiseComparisons', {})
        # Extracting all unique criteria names from the keys
        criteria_names = set()
        for key in data.keys():
            crit1, crit2 = key.split(' vs ')
            criteria_names.update([crit1, crit2])
        criteria_names = list(criteria_names)
        num_criteria = len(criteria_names)
        criteria_index = {name: i for i, name in enumerate(criteria_names)}

        # Initialize the comparison matrix
        comparisons = np.ones((num_criteria, num_criteria))  # Start with an identity matrix

        for key, value in data.items():
            crit1, crit2 = key.split(' vs ')
            if crit1 in criteria_index and crit2 in criteria_index:
                i, j = criteria_index[crit1], criteria_index[crit2]
                comparisons[i, j] = value
                comparisons[j, i] = 1 / value if value != 0 else np.inf  # Avoid division by zero
            else:
                # Log error or handle missing criteria
                print(f"Missing criteria: {crit1} or {crit2}")

        # Calculate weights using the AHP method
        weights = self.calculate_priority_weights(comparisons)
        response_data = {criteria_names[i]: weights[i] for i in range(num_criteria)}

        return Response(response_data, status=status.HTTP_200_OK)

    def calculate_priority_weights(self, comparisons):
        # Normalize the matrix and calculate the priority weights
        normalized_matrix = comparisons / comparisons.sum(axis=0)
        priority_weights = normalized_matrix.mean(axis=1)
        return priority_weights.tolist()


class TOPSISView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.get('alternatives', [])  # Récupérer les données des alternatives depuis la requête POST
        
        # Extracting criteria names and scores
        criteria_names = []
        scores = []
        for alternative in data:
            criteria_names.append(alternative['name'])
            scores.append(list(alternative['scores'].values()))
        
        scores = np.array(scores)
        
        # Step 1: Normalisation de la matrice de décision
        norm_scores = scores / np.linalg.norm(scores, axis=0)
        
        # Step 2: Calcul des poids normalisés pour chaque critère
        num_criteria = len(criteria_names)
        weights = np.mean(norm_scores, axis=0)
        
        # Step 3: Détermination de la solution idéale positive (PIS) et de la solution idéale négative (NIS)
        pis = np.max(norm_scores, axis=0)
        nis = np.min(norm_scores, axis=0)
        
        # Step 4: Calcul des distances euclidiennes entre chaque alternative et la solution idéale positive et négative
        d_pos = np.linalg.norm(norm_scores - pis, axis=1)
        d_neg = np.linalg.norm(norm_scores - nis, axis=1)
        
        # Step 5: Calcul des mesures de proximité pour chaque alternative
        proximity = d_neg / (d_pos + d_neg)
        
        # Step 6: Classement des alternatives en fonction de leurs mesures de proximité
        ranked_indices = np.argsort(proximity)
        ranked_alternatives = [criteria_names[i] for i in ranked_indices]
        
        # Renvoyer les résultats au format JSON
        results = {
            "message": "TOPSIS analysis completed successfully",
            "ranked_alternatives": ranked_alternatives,
            # Ajouter d'autres données de résultats si nécessaire
        }
        return Response(results, status=status.HTTP_200_OK)


from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Profile

from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Profile

class RegisterUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')

        if not username or not password or not first_name or not last_name or not email:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != request.data.get('confirm_password'):
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'username': ['This username is already taken.']}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'email': ['This email is already registered.']}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            Profile.objects.create(user=user, first_name=first_name, last_name=last_name)
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)
