// In the "Informations de contact" section, replace the existing content with:

<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>

  <div className="space-y-4">
    {/* Garage Name */}
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Wrench size={24} className="text-orange-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Nom du garage</h3>
        <p className="text-gray-700 text-lg font-medium">{garage.name}</p>
      </div>
    </div>

    {/* Description */}
    {garage.description && (
      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
        <Mail size={24} className="text-orange-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
          <p className="text-gray-700">{garage.description}</p>
        </div>
      </div>
    )}

    {/* Address */}
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <MapPin size={24} className="text-orange-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
        <p className="text-gray-700">{garage.address}</p>
        <p className="text-gray-600">{garage.gouvernorat}</p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Phone size={24} className="text-orange-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
        <a
          href={`tel:${garage.phone}`}
          className="text-orange-600 hover:text-orange-700 transition-colors text-lg"
        >
          {garage.phone}
        </a>
      </div>
    </div>

    {/* Email */}
    {garage.email && (
      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
        <Mail size={24} className="text-orange-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
          <a
            href={`mailto:${garage.email}`}
            className="text-orange-600 hover:text-orange-700 transition-colors break-all"
          >
            {garage.email}
          </a>
        </div>
      </div>
    )}

    {/* Opening Hours */}
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Clock size={24} className="text-orange-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
        <p className="text-gray-700">{garage.opening_hours}</p>
      </div>
    </div>

    {/* Website */}
    {garage.website && (
      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
        <ExternalLink size={24} className="text-orange-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Site web</h3>
          <a
            href={garage.website.startsWith('http') ? garage.website : `https://${garage.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 transition-colors break-all"
          >
            {garage.website}
          </a>
        </div>
      </div>
    )}
  </div>
</div>